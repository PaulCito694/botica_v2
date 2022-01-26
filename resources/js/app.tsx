require('./bootstrap');
import {QueryClient, QueryClientProvider} from "react-query";
import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';


const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';
const queryClient = new QueryClient()

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name => import(`./Pages/${name}.tsx`),
  setup({ el, App, props }) {
    return render(
      <QueryClientProvider client={queryClient}>
        <App {...props} />
      </QueryClientProvider>, el
    );
  },
});

InertiaProgress.init({ color: '#4B5563' });
