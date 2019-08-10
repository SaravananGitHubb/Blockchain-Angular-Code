import {Cattle} from './cattle';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Cattle()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const todo = new Cattle({
     // title: 'hello',
      //complete: true
    });
    //expect(todo.title).toEqual('hello');
    //expect(todo.complete).toEqual(true);
  });
});