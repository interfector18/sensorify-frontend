import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { Device } from 'models/models';
import axios, { AxiosResponse } from 'axios';

const initialDevicesState: { devices: Device[], status: string } = {
  devices: [],
  status: '',
}

export const getDevices = createAsyncThunk(
  'devices/getDevices',
  async ({ deviceName, schoolName }: { deviceName?: string, schoolName?: string } = {}) => {

    let resp: AxiosResponse;

    if (deviceName != null || schoolName != null) {
      // resp = await axios.get(process.env.API_URL + '/devices', { data: { deviceName, schoolName } });
      resp = await axios.get('https://api.sensorify.tk' + '/devices', { data: { deviceName, schoolName } });
    } else {
      // resp = await axios.get(process.env.API_URL + '/devices');
      resp = await axios.get('https://api.sensorify.tk' + '/devices');
    }

    return resp.data as Device[];
  }
);

const deviceSlice = createSlice({
  name: 'devices', initialState: initialDevicesState, reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getDevices.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(getDevices.fulfilled, (state, action) => {
      state.status = 'success';
      state.devices = action.payload;
    });
    builder.addCase(getDevices.rejected, (state, action) => {
      state.status = 'failed';
    });
  }
});

export default deviceSlice;