import { Fragment, ChangeEvent } from 'react';

import { Pizza } from '../types';
import { useQueryParam } from '../hooks';

const toppingsMap: Record<string, string> = {
  pepperoni: 'Pepperoni',
  'bell-peppers': 'Bell Peppers',
  olives: 'Olives'
};

const crustsMap: Record<string, string> = {
  regular: 'Regular Crust',
  thin: 'Thin Crust',
  'deep-dish': 'Deep Dish'
};

export function Home() {
  // eslint-disable-next-line prefer-const
  let [pizza, setPizza] = useQueryParam<Pizza>('pizza');

  if (!pizza) {
    pizza = { toppings: [], crust: 'regular', extraSauce: false };
  }

  function handleChange(event: ChangeEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const formData = new FormData(form);

    // This complex data structure is preserved in the URL in the
    // `pizza` query parameter each time a value in the form changes!
    const pizza: Pizza = {
      toppings: formData.getAll('toppings') as string[],
      crust: formData.get('crust') as string,
      extraSauce: formData.get('extraSauce') === 'on'
    };

    setPizza(pizza, { replace: true });
  }

  return (
    <div>
      <form onChange={handleChange}>
        <p>What would you like on your pizza?</p>

        <p>
          {Object.entries(toppingsMap).map(([key, name]) => (
            <Fragment key={key}>
              <label>
                <input
                  defaultChecked={pizza!.toppings.includes(key)}
                  type="checkbox"
                  name="toppings"
                  value={key}
                />{' '}
                {name}
              </label>
              <br />
            </Fragment>
          ))}
        </p>

        <p>
          {Object.entries(crustsMap).map(([key, name]) => (
            <Fragment key={key}>
              <label>
                <input
                  type="radio"
                  name="crust"
                  value={key}
                  defaultChecked={pizza!.crust === key}
                />{' '}
                {name}
              </label>
              <br />
            </Fragment>
          ))}
        </p>

        <p>
          <label>
            <input
              type="checkbox"
              name="extraSauce"
              defaultChecked={pizza.extraSauce}
            />{' '}
            Extra Sauce
          </label>
        </p>
      </form>

      <hr />

      <p>The current form values are:</p>

      <pre>{JSON.stringify(pizza || {}, null, 2)}</pre>
    </div>
  );
}
