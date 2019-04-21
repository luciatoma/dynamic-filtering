import React, { Component } from 'react';
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
    };

    filterParser = null;

    async componentDidMount() {
        this.mounted = true;
        const allWorkOrders = await getWorkOrders();
        this.filterParser = new FilterParser(getAvailableFilters(), allWorkOrders);

        if (this.mounted) this.setState({ allWorkOrders });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleBtnClick = (value, type) => {
        this.setState({ popupVisibility: { [type]: value } });
    };

    popupValues = (value, type) => {
        console.log('val', value, type);

        this.setState({ filters: { [type]: value } });
    };

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

    renderWorkOrders = () => {
        const { allWorkOrders } = this.state;

        return (
            allWorkOrders &&
            allWorkOrders.map(workOrder => (
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
            ))
        );
    };

    render() {
        console.log('filters', this.state.filters);
        return (
            <div>
                {this.renderFilterBtns()}
                {this.renderWorkOrders()}
            </div>
        );
    }
}

export default HomePage;
