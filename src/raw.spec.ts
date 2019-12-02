import {BasicDatabaseItem, isOfType, readAllDataFiles, readAndParse, readDataFile} from "./raw";
import {expect} from "chai";

interface testInterface extends BasicDatabaseItem {
    test: string
    optional?: string
}

describe('database', () => {
    describe.only('isOfType', () => {
        it('it maches all required properties', () => {
            const result = isOfType<testInterface>({
                identifier: "test"
            });

            expect(result).to.be.true;
        })

        it('does not match if basicDatabaseItem is not present', () => {
            const result = isOfType<testInterface>({
                test: "123"
            });

            expect(result).to.be.false;
        })
    });
    describe('readDataFile', () => {
        it('reads a file', async () => {
            const result = await readDataFile("./data", "test.json");

            expect(result).to.have.lengthOf(1)
        })
    })

    describe('readAllDataFiles', () => {
        it('works', async () => {
            const result = await readAllDataFiles('./data');

            expect(result).to.have.lengthOf(1);
        })
    })

    describe('readAndParse', () => {
        it('works', async () => {
            const results = await readAndParse<any>("./data");

            expect(results).to.be.lengthOf(1);
        })
    })
})
