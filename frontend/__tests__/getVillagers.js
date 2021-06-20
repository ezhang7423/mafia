import {getVillagers} from "../utils/getVillagers";

describe("utils/getVillagers", () => {
    describe("getVillagers", () => {
        it("get Vikram and Cambria as villagers", () => {
            expect(getVillagers(["Mingyu", "Eddie"],["Mingyu", "Vikram", "Eddie", "Cambria"])).toMatchObject(["Vikram","Cambria"]);
        });
        it("get Eddie as villagers", () => {
            expect(getVillagers(["Mingyu", "Vikram", "Cambria"],["Mingyu", "Vikram", "Eddie", "Cambria"])).toMatchObject(["Eddie"]);
        });
        it("get Eddie and Cambria and Mingyu as villagers", () => {
            expect(getVillagers(["Eddie"],["Mingyu", "Vikram", "Eddie", "Cambria"])).toMatchObject(["Mingyu","Vikram","Cambria",]);
        });
        it("empty for type mafia", () => {
            expect(() => {
              getVillagers("", ["Mingyu", "Vikram", "Eddie", "Cambria"]);
            }).toThrow("mafia should not be empty");
        });
        it("incorrect type for names", () => {
            expect(() => {
              getVillagers(["Eddie"], 6);
            }).toThrow("names should be an array");
        });
    });
});