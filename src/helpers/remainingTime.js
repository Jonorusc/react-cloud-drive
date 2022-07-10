export default function remainingTime(loaded, total, startedAt) {
    let percent = parseInt((loaded / total) * 100),
        timespent = Date.now() - startedAt,
        timeleft = ((100 - percent) * timespent) / percent,
        remaining,
        seconds = parseInt((timeleft / 1000) % 60),
        minutes = parseInt((timeleft / (1000 * 60)) % 60),
        hours = parseInt((timeleft / (1000 * 60 * 60)) % 24)

    if (hours > 0) {
        remaining = `${hours} hours, ${minutes} minutes and ${seconds} seconds`
    }
    else if(minutes > 0) {
        remaining = `${minutes} minutes and ${seconds} seconds`
    }
    else if(seconds > 0) {
        remaining = `${seconds} seconds`
    } else {
        remaining = 'waiting...'
    }
    return {remaining, percent}
}
