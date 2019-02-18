import moment from 'moment';


// ==================================================
// filters:
// ==================================================

export const formatDateFromISO = (DateISO) => {
    return moment(DateISO).format("MMM D 'YY [at] H:mm");
};


export const formatDollarAmount = (value) => {
    // TODO: add trailing zeros for numbers:

    let output;

    if (value < 0) {
        output = `-$${-value}`;
    }
    else if (value > 0) {
        output = `$${value}`;
    }
    else if (value === 0) {
        output = `${0}`;
    }
    // if our data is corrupted, and the 'Amount' value isn't a number:
    else {
        output = 'N/A';
    }

    return output;
};
