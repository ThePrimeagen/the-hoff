jest.useFakeTimers();
const nowSpy = jest.spyOn(global.Date, 'now');

import lerp from "../lerp";

describe("lerp", function() {
    it("should lerp", async function() {
        nowSpy.mockImplementation(() => 0);

        const to = [1, -1, 0];
        const results: number[][] = [];

        lerp(to, 1000, function(diff: number[]) {
            results.push(diff);
        });

        jest.runOnlyPendingTimers();
        nowSpy.mockImplementation(() => 500);
        jest.runOnlyPendingTimers();
        nowSpy.mockImplementation(() => 1000);
        jest.runOnlyPendingTimers();

        expect(results).toEqual([
            [0,     -0, 0],
            [0.5, -0.5, 0],
            [0.5, -0.5, 0],
        ]);
    });
});

