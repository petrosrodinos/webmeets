import axios from "axios";

import { formatClosingPeriods, formatHours, formatMeet } from "./formatter/meet";
import { getAuthHeaders, getHeaders } from "./utils/utils";
import { API_URL } from "constants/api";
import {
  NewMeet,
  Meet,
  EditMeet,
  AddPeriod,
  EditPeriod,
  DeletePeriod,
  AddClosingPeriod,
  EditClosingPeriod,
  DeleteClosingPeriod,
  AddImages,
  DeleteImages,
} from "interfaces/meet";
import { formatDateToUTC } from "lib/date";

export const createMeet = async (payload: NewMeet) => {
  try {
    const result = await axios.post(`${API_URL}meets`, payload, getHeaders());
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getMeets = async (query: { [key: string]: string } = {}): Promise<Meet[]> => {
  try {
    const result = await axios.get(`${API_URL}meets?${new URLSearchParams(query).toString()}`);
    const formattedData = result.data.map((meet: any) => formatMeet(meet));
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getMeet = async (id: string): Promise<Meet> => {
  try {
    const result = await axios.get(`${API_URL}meets/${id}`);
    const formattedData = formatMeet(result.data);
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const editMeet = async (id: string, payload: EditMeet) => {
  try {
    if (payload?.imagesToDelete?.length > 0) {
      await deleteImages({ meetId: id, images: payload.imagesToDelete });
    }
    if (payload?.newImages?.length > 0) {
      await addImages({ meetId: id, images: payload.newImages });
    }

    const { images, ...newPayload } = payload;

    const result = await axios.patch(`${API_URL}meets/${id}`, newPayload, getAuthHeaders());
    const formattedData = formatMeet(result.data);
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const deleteMeet = async (id: string) => {
  try {
    const result = await axios.delete(`${API_URL}meets/${id}`, getAuthHeaders());
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const addPeriod = async (payload: AddPeriod) => {
  try {
    const { meetId, hourId } = payload;
    const period = { from: payload.from, to: payload.to };
    const result = await axios.post(
      `${API_URL}meets/${meetId}/hours/${hourId}/periods`,
      period,
      getAuthHeaders()
    );
    const formattedData = formatHours(result.data.hours);
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const editPeriod = async (payload: EditPeriod) => {
  try {
    const { meetId, hourId, periodId } = payload;
    const period = { from: payload.from, to: payload.to };
    const result = await axios.patch(
      `${API_URL}meets/${meetId}/hours/${hourId}/periods/${periodId}`,
      period,
      getAuthHeaders()
    );
    const formattedData = formatHours(result.data.hours);
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const deletePeriod = async (payload: DeletePeriod) => {
  const { meetId, hourId, periodId } = payload;
  try {
    const result = await axios.delete(
      `${API_URL}meets/${meetId}/hours/${hourId}/periods/${periodId}`,
      getAuthHeaders()
    );
    const formattedData = formatHours(result.data.hours);
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const addClosingPeriod = async (payload: AddClosingPeriod) => {
  try {
    const { meetId } = payload;
    const closingPeriod = {
      name: payload.name,
      description: payload.description,
      from: formatDateToUTC(payload.from),
      to: formatDateToUTC(payload.to),
    };
    const result = await axios.post(
      `${API_URL}meets/${meetId}/closures`,
      closingPeriod,
      getAuthHeaders()
    );
    const formattedData = formatClosingPeriods(result.data.closures);
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const editClosingPeriod = async (payload: EditClosingPeriod) => {
  try {
    const { meetId, closingPeriodId } = payload;
    const closingPeriod = {
      name: payload.name,
      description: payload.description,
      from: payload.from,
      to: payload.to,
    };
    const result = await axios.patch(
      `${API_URL}meets/${meetId}/closures/${closingPeriodId}`,
      closingPeriod,
      getAuthHeaders()
    );
    const formattedData = formatClosingPeriods(result.data.closures);
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const deleteClosingPeriod = async (payload: DeleteClosingPeriod) => {
  try {
    const { meetId, closingPeriodId } = payload;
    const result = await axios.delete(
      `${API_URL}meets/${meetId}/closures/${closingPeriodId}`,
      getAuthHeaders()
    );
    const formattedData = formatClosingPeriods(result.data.closures);
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const addImages = async (payload: AddImages) => {
  try {
    const { meetId, images } = payload;
    const result = await axios.post(`${API_URL}meets/${meetId}/images`, images, getHeaders());
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const deleteImages = async (payload: DeleteImages) => {
  try {
    const { meetId, images } = payload;
    const result = await axios.patch(
      `${API_URL}meets/${meetId}/images`,
      { images },
      getAuthHeaders()
    );
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
