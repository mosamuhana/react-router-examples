import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { DeferredRouteLoaderData } from '../types';
import { RenderAwaitedData, RenderAwaitedError } from '../components';

export function DeferredPage() {
  const data = useLoaderData() as DeferredRouteLoaderData;

  return (
    <div>
      {/* Critical data renders immediately */}
      <p>{data.critical1}</p>
      <p>{data.critical2}</p>

      {/* Pre-resolved deferred data never triggers the fallback */}
      <Suspense fallback={<p>should not see me!</p>}>
        <Await resolve={data.lazyResolved}>
          <RenderAwaitedData />
        </Await>
      </Suspense>

      {/* Deferred data can be rendered using a component + the useAsyncValue() hook */}
      <Suspense fallback={<p>loading 1...</p>}>
        <Await resolve={data.lazy1}>
          <RenderAwaitedData />
        </Await>
      </Suspense>

      <Suspense fallback={<p>loading 2...</p>}>
        <Await resolve={data.lazy2}>
          <RenderAwaitedData />
        </Await>
      </Suspense>

      {/* Or you can bypass the hook and use a render function */}
      <Suspense fallback={<p>loading 3...</p>}>
        <Await resolve={data.lazy3}>{(data: string) => <p>{data}</p>}</Await>
      </Suspense>

      {/* Deferred rejections render using the useAsyncError hook */}
      <Suspense fallback={<p>loading (error)...</p>}>
        <Await resolve={data.lazyError} errorElement={<RenderAwaitedError />}>
          <RenderAwaitedData />
        </Await>
      </Suspense>
    </div>
  );
}
