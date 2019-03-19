import moment from 'moment';

/**
 * Formats ISO date format
 *
 * @param isoValue
 * @returns {string}
 */
export const formatISOTimeToMonthDayYearHourMinutesMeridiem = (isoValue) => {
    return moment(isoValue).format('MMM D, YYYY, h:mma').toString();
};
