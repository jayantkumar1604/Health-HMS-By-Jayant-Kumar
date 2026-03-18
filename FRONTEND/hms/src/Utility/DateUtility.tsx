const formatDate=(dateString: any)=> {
    if (!dateString) return undefined;
    const date = new Date(dateString);

    const day = date.getDate();
    const year = date.getFullYear();

    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    const month = months[date.getMonth()];

    return `${day} ${month} ${year}`;

}

const formatDateWithTime = (dateString:any) => {
    if(!dateString) return undefined;
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: 'numeric',
        month: "long",// Monday
        day: "numeric",    // 18
        hour: "numeric",   // 10
        minute: "numeric", // 30
        hour12: true       // AM/PM
    };
    return date.toLocaleString("en-US",options);
}

export {formatDate,formatDateWithTime}