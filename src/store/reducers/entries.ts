import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { Entry } from 'models/models';
import axios, { AxiosResponse } from 'axios';

const initialEntriesState: { entries: Entry[], status: string } = {
  entries: [],
  status: '',
}

export const getEntries = createAsyncThunk(
  'entries/getEntries',
  async ({ fromDate, endDate }: { fromDate?: Date, endDate?: Date } = {}) => {

    let resp: AxiosResponse;

    if (fromDate != null || endDate != null) {
      // resp = await axios.get(process.env.API_URL + '/entries', { data: { fromDate, endDate } });
      resp = await axios.get('https://api.sensorify.tk' + '/entries', { data: { fromDate, endDate } });
    } else {
      // resp = await axios.get(process.env.API_URL + '/entries');
      resp = await axios.get('https://api.sensorify.tk' + '/entries');
    }

    for (const entry of resp.data as Entry[]) {
      entry.timestamp = new Date(entry.timestamp);
    }

    return resp.data as Entry[];
  }
);

const deviceSlice = createSlice({
  name: 'entries', initialState: initialEntriesState, reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getEntries.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(getEntries.fulfilled, (state, action) => {
      state.status = 'success';
      state.entries = action.payload;
    });
    builder.addCase(getEntries.rejected, (state, action) => {
      state.status = 'failed';
    });
  }
});

export default deviceSlice;