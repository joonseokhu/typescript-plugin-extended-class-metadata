import 'reflect-metadata';

export class Foo {
  value: string;
}

export class Bar<T> {
  value: T;
}

const foo1 = new Foo();
foo1.value = 'sub1-value';

const foo2 = new Foo();
foo2.value = 'sub2-value';

const bar1 = new Bar<number>();
bar1.value = 1;

const bar2 = new Bar<number>();
bar2.value = 2;

export {
  foo1, foo2, bar1, bar2,
};

export class ClassTest {
  foo1: Foo;

  foo2: Foo = foo1;

  foo3: Foo = foo2;

  foo4: Foo = new Foo();

  foo5?: Foo;

  foo6?: Foo = undefined;

  foo7?: Foo = foo1;

  foo8?: Foo = foo2;

  foos1: Foo[];

  foos2: Foo[] = [];

  foos3: Foo[] = [foo1];

  foos4: Foo[] = [new Foo()];

  foos5?: Foo[];

  foos6?: Foo[] = undefined;

  foos7?: Foo[] = [];

  foos8?: Foo[] = [foo2];

  bar1: Bar<number>;

  bar2: Bar<number> = bar1;

  bar3: Bar<number> = bar2;

  bar4: Bar<number> = new Bar();

  bar5?: Bar<number>;

  bar6?: Bar<number> = undefined;

  bar7?: Bar<number> = bar1;

  bar8?: Bar<number> = bar2;

  bars1: Bar<number>[];

  bars2: Bar<number>[] = [];

  bars3: Bar<number>[] = [bar1];

  bars4: Bar<number>[] = [new Bar()];

  bars5?: Bar<number>[];

  bars6?: Bar<number>[] = undefined;

  bars7?: Bar<number>[] = [];

  bars8?: Bar<number>[] = [bar2];
}
