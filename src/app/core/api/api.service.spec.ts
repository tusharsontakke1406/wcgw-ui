import { ApiService } from './api.service';
describe('ApiService', () => {
  it('should be created', () => {
    const service = new ApiService({} as any);
    expect(service).toBeTruthy();
  });
});