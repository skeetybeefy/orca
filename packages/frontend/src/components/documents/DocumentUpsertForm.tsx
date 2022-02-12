import { Field, FieldProps, Form, Formik } from 'formik';
import { IDocument } from 'types/interfaces/document';

import { Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';

interface IProps {
    onSubmit: (values: Omit<IDocument, "id" | "accessGroups">) => void;
    initialValues: Omit<IDocument, "id" | "accessGroups">;
    buttonText: string
}

const DocumentUpsertForm = ({onSubmit, initialValues, buttonText}: IProps) => {
    return (
        <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                enableReInitialize={true}>
                    {(props) => 
                    <Form onSubmit={props.handleSubmit}>
                        <Field name="name">
                            {({field}: FieldProps) => (
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input {...field} id="name" type="text" mb={4} />
                            </FormControl>
                            )}
                        </Field>
                        <Field name="description">
                            {({field}: FieldProps) => (
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input {...field} id="description" type="text" mb={4} />
                            </FormControl>
                            )}
                        </Field>
                        <Field name="category">
                            {({field}: FieldProps) => (
                            <FormControl>
                            <FormLabel>Category</FormLabel>
                                <Select {...field} id="category" mb={4}>
                                    <option>Text</option>
                                    <option>Video</option>
                                </Select>
                            </FormControl>
                            )}
                        </Field>
                        <Field name="ownerId">
                            {({field}: FieldProps) => (
                            <FormControl>
                                <FormLabel>Owner</FormLabel>
                                <Input {...field} id="ownerId" type="text" mb={4} />
                            </FormControl>
                            )}
                        </Field>
                        <Button type="submit" isLoading={props.isSubmitting}>{buttonText}</Button>
                    </Form>
                    }
                </Formik>
    )
}

export default DocumentUpsertForm