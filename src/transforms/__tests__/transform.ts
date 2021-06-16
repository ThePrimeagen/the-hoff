jest.useFakeTimers();
const nowSpy = jest.spyOn(global.Date, 'now');

import transform from "../transform";

describe("transform", function() {
    beforeEach(function() {
        nowSpy.mockImplementation(() => 0);
    });

    it("transform away!", function() {
        const from = [100, 100];
        const to = [200, 200];
        const results: [boolean, number[]][] = [];

        transform(from, to, 1000, false, function(curr: number[], finished: boolean) {
            results.push([finished, curr]);
        });

        jest.runOnlyPendingTimers();
        nowSpy.mockImplementation(() => 500);
        jest.runOnlyPendingTimers();
        nowSpy.mockImplementation(() => 1000);
        jest.runOnlyPendingTimers();

        expect(results).toEqual([
            [false, from],
            [false, [150, 150]],
            [true, to],
        ]);
    });
});

