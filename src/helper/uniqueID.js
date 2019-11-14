const uniqueId = () => `${Math.random().toString(36).substr(2, 5)}${Math.random().toString(36).substr(2, 9)}${Math.random().toString(36).substr(2, 9)}`;

export default uniqueId;
