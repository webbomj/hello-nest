import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Тестирование функций getAll', () => {


    it('Должен возвращаться массив', () => {
      const result = service.getAll()
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe('Тестирование функций getOne', () => {


    it('Должен возвращаться фильм', () => {
      service.create({
        title: 'Тестовый фильм',
        genres: ['Тестовый жанр'],
        year: 2000,
      })
      const movie = service.getOne(1);
      expect(movie).toBeDefined;
      expect(movie.id).toEqual(1);
    })

    it('Должна возвращаться 404 ошибка', () => {
      try {
        const movie = service.getOne(123123213123);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Фильм с id: 123123213123 не найден`)
      }
    })
  })

  describe('Тестирование функций remove', () => {
    it('Фильм удаляется', () => {
      service.create({
        title: 'Тестовый фильм',
        genres: ['Тестовый жанр'],
        year: 2000,
      })
      const allMovies = service.getAll().length;
      service.remove(1);
      const afterRemove = service.getAll().length;
      expect(afterRemove).toBeLessThan(allMovies);
    })

    it('Возвращается 404 ошибка при удалении', () => {
      try {
        const movie = service.remove(123123213123);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe('Тестирование функции create', () => {
    it('Фильм создается', () => {

      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Тестовый фильм',
        genres: ['Тестовый жанр'],
        year: 2000,
      })
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  })

  describe('Тестирование функции Patch', () => {
    it('Фильм изменен', () => {
      service.create({
        title: 'Тестовый фильм',
        genres: ['Тестовый жанр'],
        year: 2000,
      })
      service.patch(1, {title: 'Обновленный тест'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Обновленный тест')
    })

    it('Возвращается 404 ошибка при изменении', () => {
      try {
        const movie = service.patch(123123213123, {});
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })
});
