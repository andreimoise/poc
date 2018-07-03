import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DepartmentsTable from './departments_table_component'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/'   component={DepartmentsTable}/>
    </Switch>
  </main>
)

export default Main