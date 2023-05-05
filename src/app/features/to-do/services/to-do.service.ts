import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Todo } from "../models/to-do.model";

@Injectable()
export class TodoService {
  constructor(
    private _http: HttpClient
  ) {

  }

  addTodo(data: Todo): Promise<Todo> {
    return new Promise((resolve, reject) => {
      this._http.post<Todo>(`/todo-items`, data, { responseType: 'json' })
        .subscribe({
          next: (resp) => resolve(resp),
          error: (err) => reject(err),
          complete: () => { }
        });
    });
  }

  getTodos(activity_group_id: number): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
      this._http.get<any>(`/todo-items?activity_group_id=${encodeURI(activity_group_id.toString())}`)
        .subscribe({
          next: (resp) => resolve(resp.data),
          error: (err) => reject(err),
          complete: () => { }
        });
    });
  }

  getTodo(id: number): Promise<Todo> {
    return new Promise((resolve, reject) => {
      this._http.get<Todo>(`/todo-items/${id}`, { responseType: 'json' })
        .subscribe({
          next: (resp) => resolve(resp),
          error: (err) => reject(err),
          complete: () => { }
        });
    });
  }

  updateTodo(data: Todo): Promise<Todo> {
    return new Promise((resolve, reject) => {
      this._http.patch<Todo>(`/todo-items/${data.id}`, data, { responseType: 'json' })
        .subscribe({
          next: (resp) => resolve(resp),
          error: (err) => reject(err),
          complete: () => { }
        });
    });
  }

  deleteTodo(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._http.delete<void>(`/todo-items/${id}`, { responseType: 'json' })
        .subscribe({
          next: (resp) => resolve(resp),
          error: (err) => reject(err),
          complete: () => { }
        });
    });
  }
}