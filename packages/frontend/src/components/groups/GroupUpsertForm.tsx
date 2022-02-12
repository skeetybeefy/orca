import { Field, FieldProps, Form, Formik } from 'formik';
import { Select } from 'chakra-react-select';
import { IGroup } from 'types/interfaces/group';

import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useEffect } from 'react';
import { getAllUsersAsync } from 'store/actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from 'store/selectors/users';

interface IProps {
    onSubmit: (values: Omit<IGroup, "id">) => void;
    initialValues: Omit<IGroup, "id">;
    buttonText: string
}


const GroupUpsertForm = ({ onSubmit, initialValues, buttonText }: IProps) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsersAsync())
    }, [dispatch])

    const users = useSelector(selectAllUsers)

    const mappedUsers = users.map((user) => {
        return {
            value: `${user.firstName} ${user.lastName}`, 
            label: `${user.firstName} ${user.lastName}`
        }
    })

    console.log(`Init values: ${JSON.stringify(initialValues)}`)

    const mappedInitialValues = {
        ...initialValues,
        membersIds: initialValues.membersIds.map((member) => {
            return {
                value: member,
                label: member,
            }
        })
    }

    return (
        <Formik
            initialValues={mappedInitialValues}
            onSubmit={onSubmit}
            enableReInitialize={true}>
            {(props) =>
                <Form onSubmit={props.handleSubmit}>
                    <Field name="name">
                        {({ field }: FieldProps) => (
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input {...field} id="name" type="text" mb={4} />
                            </FormControl>
                        )}
                    </Field>
                    <Field name="description">
                        {({ field }: FieldProps) => (
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input {...field} id="description" type="text" mb={4} />
                            </FormControl>
                        )}
                    </Field>
                    <Field name="membersIds">
                        {({ field, form }: FieldProps) => (
                            <FormControl>
                                {console.log(`Field: ${JSON.stringify(field)}`)}
                                <FormLabel>Members</FormLabel>
                                <Select
                                    isMulti 
                                    {...field} 
                                    options={mappedUsers}
                                    id="membersIds"
                                    placeholder="Select members"
                                    onChange={(value) => {
                                        console.log(`Value: ${JSON.stringify(value)}`)
                                        form.setFieldValue(field.name, value)
                                    }}
                                    chakraStyles={{
                                        control: (provided) => ({
                                            ...provided,
                                            mb: 4
                                        })
                                    }}/>
                            </FormControl>
                        )}
                    </Field>
                    <Field name="owner">
                        {({ field }: FieldProps) => (
                            <FormControl>
                                <FormLabel>Owner</FormLabel>
                                <Input {...field} id="owner" type="text" mb={4} />
                            </FormControl>
                        )}
                    </Field>
                    <Button type="submit" isLoading={props.isSubmitting}>{buttonText}</Button>
                </Form>
            }
        </Formik>
    )
}

export default GroupUpsertForm