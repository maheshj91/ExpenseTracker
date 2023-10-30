import {useContext, useLayoutEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import IconButton from '../components/UI/IconButton';
import {GlobalStyles} from '../constants/Styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function ManageExpense({route, navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params ?. expenseId;
    const isEdited = !! editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEdited ? "Edit Expense" : "Add Expense"
        });
    }, [navigation, isEdited]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
        } catch(error) {
            setError('Could not delete expense - please try again later!')
            setIsSubmitting(false);
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try {
            if (isEdited) {
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({...expenseData, id: id});
            }
            navigation.goBack();
        } catch(error) {
            setError('Could not save data - please try again later!')
            setIsSubmitting(false);
        }
    }

    function errorHandler() {
        setError(null);
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />;
    }

    return (
        <View style={styles.container}> 
            <ExpenseForm onCancel={cancelHandler} submitButtonLabel={isEdited ? 'Update' : 'Add'}
            onSubmit={confirmHandler}
            defaultValues={selectedExpense} />
            
            {isEdited && (
                <View style={styles.deleteContainer}>
                <IconButton icon='trash'
                    color={
                        GlobalStyles.colors.error500
                    }
                    size={36}
                    onPress={deleteExpenseHandler}
                />
                </View>
            )} 
        </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    }
});
