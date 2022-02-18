module.exports = () => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    return (hours * 60) + minutes;
}