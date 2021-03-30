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
    const isToken = await this.axiosRepository.findOne();

    const axios = new Axios();
    axios.access_token = process.env.ACCESS_TOKEN;
    axios.refresh_token = process.env.REFRESH_TOKEN;
    axios.token_type = process.env.TOKEN_TYPE;
    axios.expires_in = parseInt(process.env.EXPIRES_IN);

    if (!isToken) {
      await this.axiosRepository.save(axios);
    }
  }

  async fetcher(url) {
    const token = await this.axiosRepository.findOne();

    this.httpService.axiosRef.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        const status = error.response ? error.response.status : null;

        if (token && status === 401) {
          console.log('need to refresh token');
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
}
