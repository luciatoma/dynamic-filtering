import React, { Component } from 'react';
import { getWorkOrders } from '../../../services/api';
import WorkOrderCard from '../../generic/WorkOrderCard';

class HomePage extends Component {
    state = {
        allWorkOrders: [],
    };

    async componentDidMount() {
        this.mounted = true;
        const allWorkOrders = await getWorkOrders();

        if (this.mounted) this.setState({ allWorkOrders });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const { allWorkOrders } = this.state;

        return (
            <div>
                <span>Home Page</span>
                {allWorkOrders &&
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
                    ))}
            </div>
        );
    }
}

export default HomePage;
