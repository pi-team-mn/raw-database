import {readdir, readFile} from 'fs'

const dataDirectory = "./data";

const readdirPromise = (path: string) => new Promise<string[]>((resolve, reject) => readdir(path, (err, files) => err ? reject(err) : resolve(files)));
const readFilePromise = (file: string) => new Promise<Buffer>((resolve, reject) => readFile(file, (err, data) => err ? reject(err) : resolve(data)));

export const readAndParse = async <T>(dataDirectory): Promise<T[]> => readAllDataFiles().then(items => items.map(value => <T>value));

export const readAllDataFiles = async () => (await readdirPromise(dataDirectory))
    .map((file: string) => readDataFile(dataDirectory, file))
    .reduce(async (previousValue, currentValue) => (await previousValue).concat(await currentValue));

export async function readDataFile(dir: string, file: string): Promise<any[]> {
    const contents = await readFilePromise(`${dir}/${file}`)
        .then(file => file.toString());

    return JSON.parse(contents);
}