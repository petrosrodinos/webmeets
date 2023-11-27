import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class DailyService {
  private DAILY_API_KEY = this.config.get('DAILY_API_KEY');
  private DAILY_DOMAIN = 'https://api.daily.co/v1/';
  headers = {
    headers: {
      Authorization: `Bearer ${this.DAILY_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  constructor(private config: ConfigService) {}

  async createRoom(payload: any): Promise<any> {
    try {
      const response = await axios.post(
        `${this.DAILY_DOMAIN}rooms`,
        {
          properties: {
            // enable_chat: false,
            // enable_screenshare: false,
            // enable_knocking: false,
            start_video_off: true,
            start_audio_off: true,
            // owner_only_broadcast: true,
            // enable_recording: false,
            // enable_grid_view: false,
          },
          privacy: 'public',
        },
        this.headers,
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getRoom(roomName: string): Promise<any> {
    try {
      const response = await axios.get(`${this.DAILY_DOMAIN}rooms/${roomName}`, this.headers);

      return response.data;
    } catch (error) {
      return error;
    }
  }

  async deleteRoom(roomName: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.DAILY_DOMAIN}rooms/${roomName}`, this.headers);

      return response.data;
    } catch (error) {
      return error;
    }
  }
}
