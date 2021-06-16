jest.useFakeTimers();
const nowSpy = jest.spyOn(global.Date, 'now');

import transform from "../transform";

describe("transform", function() {
    beforeEach(function() {
        nowSpy.mockImplementation(() => 0);
    });

    it("transform away!", function() {
        const to = [200, -100];
        const results: [boolean, number[]][] = [];

        transform(to, 1000, function(curr: number[], finished: boolean) {
            results.push([finished, curr]);
        });

        jest.runOnlyPendingTimers();
        nowSpy.mockImplementation(() => 500);
        jest.runOnlyPendingTimers();
        nowSpy.mockImplementation(() => 1000);
        jest.runOnlyPendingTimers();

        expect(results).toEqual([
            [false, [0, -0]],
            [false, [100, -50]],
            [true, [100, -50]],
        ]);
    });
});

