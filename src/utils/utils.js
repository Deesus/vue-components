import moment from 'moment';


// ==================================================
// filters:
// ==================================================

export const formatDateFromISO = (DateISO) => {
    return moment(DateISO).format("MMM D 'YY [at] H:mm");
};


export const formatDollarAmount = (value) => {

    // parse string as number and pad with trailing zeros, if necessary:
    let formattedVal = parseFloat(value)
                       .toFixed(2);


    // add dollar symbol in appropriate location in string:
    if (value < 0) {
        formattedVal = `-$${-formattedVal}`;    // n.b. we take the absolute value of a negative number before adding the `-$` prefix
    }
    else if (value > 0) {
        formattedVal = `$${formattedVal}`;
    }
    else if (value === 0) {
        formattedVal = `${0}`;
    }
    // if our data is corrupted, and the 'Amount' value isn't a number:
    else {
        formattedVal = 'N/A';
    }

    return formattedVal;
};
