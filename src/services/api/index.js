import workOrders from './workOrders';

const getWorkOrders = () => Promise.resolve(workOrders);

// eslint-disable-next-line import/prefer-default-export
export { getWorkOrders };
