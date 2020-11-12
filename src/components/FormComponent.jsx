import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { GET_A_POKEMON } from '../axios/queries';
import { axiosInstance as axios } from '../axios/config';

import ListComponent from './ListComponent';

export default function FormComponent() {
  const [capturedPokemons, setCapturedPokemons] = useState([]);

  return (
    <Formik
      initialValues={{ pokemonName: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.pokemonName) {
          errors.pokemonName = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);

        axios
          .get(`${GET_A_POKEMON(values.pokemonName)}`)
          .then((response) => {
            const nextPokemon = {
              name: response.data?.species?.name,
              id: response.data?.id,
              imageUrl: response.data?.sprites?.front_default,
            };

            setCapturedPokemons([
              ...capturedPokemons,
              {
                ...nextPokemon,
              },
            ]);
          })
          .catch((error) => {
            console.error(error);
          })
          .then(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <div className='container'>
          <Form>
            <h1>Catch Them All!</h1>
            <p>
              Type a pokemon name to catch it. Example: "pikachu", "charmander",
              "mew"
            </p>
            <Field type='text' name='pokemonName' />
            <ErrorMessage name='pokemonName' component='div' />

            <button type='submit' disabled={isSubmitting}>
              Catch!
            </button>
          </Form>

          <ListComponent elements={capturedPokemons} />
        </div>
      )}
    </Formik>
  );
}
