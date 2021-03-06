import {readdir, readFile} from 'fs'

export interface BasicDatabaseItem {
    identifier: string
}

const readdirPromise = (path: string) => new Promise<string[]>((resolve, reject) => readdir(path, (err, files) => err ? reject(err) : resolve(files)));
const readFilePromise = (file: string) => new Promise<Buffer>((resolve, reject) => readFile(file, (err, data) => err ? reject(err) : resolve(data)));

export const isOfType = <T extends BasicDatabaseItem>(item: any) => (item as T).identifier !== undefined;

export const readAndParse = async <T extends BasicDatabaseItem>(dataDirectory: string): Promise<T[]> => readAllDataFiles(dataDirectory)
    .then(items => items
        .filter(value => isOfType<T>(value))
        .map(value => <T>value)
    );

export const readAllDataFiles = async (dataDirectory: string) => (await readdirPromise(dataDirectory))
    .map((file: string) => readDataFile(dataDirectory, file))
    .reduce(async (previousValue, currentValue) => (await previousValue).concat(await currentValue));

export async function readDataFile(dir: string, file: string): Promise<any[]> {
    if (file.endsWith(".json")) {
        const contents = await readFilePromise(`${dir}/${file}`)
            .then(file => file.toString());

        return JSON.parse(contents);
    } else {
        return []
    }
}
