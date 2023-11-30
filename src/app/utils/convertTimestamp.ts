const formatTimestampToTime = (timestamp: number): string =>
    new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

export default formatTimestampToTime;
