import workOrders from './workOrders';
import filters from './filters';

const getWorkOrders = () => Promise.resolve(workOrders);
const getAvailableFilters = () => filters;

export { getWorkOrders, getAvailableFilters };
