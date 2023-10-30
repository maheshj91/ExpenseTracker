import { Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';

function AllExpenses() {
    const expensexCtx = useContext(ExpensesContext);
    return (
        <ExpensesOutput expenses={expensexCtx.expenses} periodName="Total" fallbackText="No registered expenses found." />
    )
}

export default AllExpenses;