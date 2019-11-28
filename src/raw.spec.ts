import {readAllDataFiles, readAndParse, readDataFile} from "./raw";
import {expect} from "chai";

describe('database', () => {
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
