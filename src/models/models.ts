enum SensorType {
    light,
    temp
};

export interface Device {
    id: number,
    deviceName: string,
    schoolName: string
};

export interface Entry {
    id: number,
    value: number,
    sensorType: SensorType,
    deviceId: number,
    timestamp: Date
};