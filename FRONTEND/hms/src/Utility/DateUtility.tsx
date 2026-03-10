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

export {formatDate}