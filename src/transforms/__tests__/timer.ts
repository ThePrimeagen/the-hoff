jest.useFakeTimers();

import createTimer from "../timer";

describe("timer", function() {
    beforeEach(function() {
        jest.clearAllTimers();
    });

    it("should really keep the time, all timery like...", function() {
        let count = 0;

        createTimer(1000, function() {
            count++;
        });

        expect(count).toEqual(0);
        jest.runOnlyPendingTimers();
        expect(count).toEqual(1);
    });

    it("should properly stop", function() {
        let count = 0;

        const stop = createTimer(1000, function() {
            count++;
        });

        expect(count).toEqual(0);
        jest.runOnlyPendingTimers();
        expect(count).toEqual(1);
        stop();
        jest.runOnlyPendingTimers();
        expect(count).toEqual(1);
    });

});


