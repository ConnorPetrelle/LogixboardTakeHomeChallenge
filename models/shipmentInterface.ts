export const SHIPMENT_TYPE: string = "SHIPMENT"

interface Shipment {
    type: "SHIPMENT";
    referenceId: string;
    organizations: string[]; // Array of organization codes
    estimatedTimeArrival?: Date;
    transportPacks: TransportPacks;
}

interface TransportPacks {
    nodes: TransportPackNode[]
}

interface TransportPackNode {
    totalWeight: NodeTotalWeight
}

interface NodeTotalWeight {
    weight: number;
    unit: string;
}

export default Shipment