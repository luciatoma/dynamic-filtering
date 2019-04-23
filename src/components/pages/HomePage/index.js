import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';

import { getWorkOrders, getAvailableFilters } from '../../../services/api';
import FilterParser from '../../../utils/filterParser';
import styles from './styles.scss';
import Button from '../../generic/Button';
import Popup from '../../generic/Popup';
import WorkOrderCard from '../../generic/WorkOrderCard';

class HomePage extends Component {
    state = {
        allWorkOrders: [],
        filters: {},
        popupVisibility: {},
        filteredWorkOrders: [],
    };

    // Flag to avoid setting the state after the unmount on unit testing. Setting it here instead of cdm
    mounted = true;

    // Initialize the filter parser
    filterParser = new FilterParser(getAvailableFilters());

    async componentDidMount() {
        this.mounted = true;
        const allWorkOrders = await getWorkOrders();

        if (this.mounted) this.setState({ allWorkOrders });
    }

    componentDidUpdate(prevProps, prevState) {
        const { filters, allWorkOrders } = this.state;
        // If the filters change or the data changes, then refilter
        if (!isEqual(filters, prevState.filters) || !isEqual(allWorkOrders, prevState.allWorkOrders)) {
            const filteredWorkOrders = this.filterParser.getFilteredResults(filters, allWorkOrders);
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ filteredWorkOrders });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    // Handle button action to filter (when filter is simple) or show popup (when filter requires innput)
    handleBtnClick = (value, type) => {
        const filters = {};
        if (value) {
            filters[type] = {};
        } else {
            delete filters[type];
        }
        this.setState({ popupVisibility: { [type]: value }, filters });
    };

    popupValues = ({ item, value, checked, title }) => {
        const { filters } = this.state;

        // If the filter exists, clone it to avoid overwriting, else initialize it.
        const filtersClone = filters[title] ? cloneDeep(filters) : {};

        if (!filtersClone[title]) filtersClone[title] = {};

        if (item === 'StartDate') {
            filtersClone[title][item] = value;
        } else {
            // Add or remove the values from the filter array, based on the checkbox value
            if (!filtersClone[title][item]) filtersClone[title][item] = [];
            if (checked && !filtersClone[title][item].includes(value)) {
                filtersClone[title][item].push(value);
            } else if (!checked && filtersClone[title][item].includes(value)) {
                filtersClone[title][item] = filtersClone[title][item].filter(filter => filter !== value);
                // Delete the filter if it's empty
                if (isEmpty(filtersClone[title][item])) delete filtersClone[title][item];
            }
        }

        this.setState({ filters: filtersClone });
    };

    // Function handling filter buttons view and passing props
    renderFilterBtns = () => {
        const { popupVisibility, filters } = this.state;
        if (this.filterParser) {
            const filtersAvailable = this.filterParser.getReactFilters();
            return (
                <div className={styles.btnFilterWrapper}>
                    {filtersAvailable.map(filter => (
                        <div key={filter.title} className={styles.btnFilter}>
                            <Button
                                active={popupVisibility[filter.title]}
                                title={filter.title}
                                handleBtnClick={this.handleBtnClick}
                            />
                            {filter.userInput && popupVisibility[filter.title] && (
                                <Popup
                                    title={filter.title}
                                    userInput={filter.userInput}
                                    popupValues={this.popupValues}
                                    activeFilters={filters[filter.title]}
                                />
                            )}
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    // Function handling work order cards view and passing props
    renderWorkOrders = () => {
        const { filteredWorkOrders } = this.state;

        return filteredWorkOrders.map(workOrder => (
            <WorkOrderCard
                key={workOrder.Id}
                name={workOrder.Name}
                type={workOrder.Type}
                status={workOrder.Status}
                endDate={workOrder.EndDate}
                startDate={workOrder.StartDate}
                description={workOrder.Description}
                color={workOrder.Color}
            />
        ));
    };

    render() {
        return (
            <div>
                {this.renderFilterBtns()}
                {this.renderWorkOrders()}
            </div>
        );
    }
}

export default HomePage;
