import { HttpService, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Axios } from './axios.entity';

@Injectable()
export class AxiosService {
  constructor(
    @InjectRepository(Axios)
    private axiosRepository: Repository<Axios>,
    private httpService: HttpService,
  ) {}

  async onModuleInit() {
    await this.setToken();
  }

  async setToken(data?) {
    const isToken = await this.axiosRepository.findOne();

    const axios = new Axios();

    axios.access_token = data ? data.access_token : process.env.ACCESS_TOKEN;
    axios.refresh_token = data ? data.refresh_token : process.env.REFRESH_TOKEN;
    axios.token_type = process.env.TOKEN_TYPE;
    axios.expires_in = data
      ? data.expires_in
      : parseInt(process.env.EXPIRES_IN);

    if (!isToken) {
      await this.axiosRepository.save(axios);
    }
    if (isToken && data) {
      await this.axiosRepository.update(1, axios);
    }
  }

  async fetcher(url) {
    const token = await this.axiosRepository.findOne();

    this.httpService.axiosRef.interceptors.response.use(
      (res) => {
        return res;
      },

      async (error) => {
        const status = error.response ? error.response.status : null;

        if (token && status === 401) {
          console.log('need to refresh token');
          await this.getTokenRefresh();
        }
      },
    );
    this.httpService.axiosRef.interceptors.request.use(async (config) => {
      if (token) {
        config.headers.authorization = `Bearer ${token.access_token}`;
      }

      return config;
    });
    return this.httpService
      .get(`https://devguschaninovandrey.amocrm.ru/api/v4/${url}`)
      .toPromise();
  }

  async getTokenRefresh() {
    const token = await this.axiosRepository.findOne();

    this.httpService
      .post(`https://devguschaninovandrey.amocrm.ru/oauth2/access_token`, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
        redirect_uri: process.env.REDIRECT_URI,
      })
      .toPromise()
      .then((res) => {
        this.setToken(res.data);
      })
      .catch((e) => console.log(e));
  }
}
