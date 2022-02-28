import { MultiValue, Select, SingleValue } from 'chakra-react-select';
import { useFormik } from 'formik';
import { FileCategory } from 'monotypes/FileCategory.enum';
import { ICreateFileCardDto } from 'monotypes/IFileCard.interface';
import { useCallback, useMemo } from 'react';

import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

interface IProps {
    onSubmit: (values: ICreateFileCardDto) => void;
    initialValues: ICreateFileCardDto;
    buttonText: string;
}

const FileCardUpsertForm = ({ onSubmit, initialValues, buttonText }: IProps) => {
    const { handleSubmit, handleBlur, handleChange, values, setFieldValue } =
        useFormik({
            initialValues,
            onSubmit,
        })

    const onCategoryChange = useCallback(
        (category: SingleValue<{ value: number, label: string }>) => {
            const transformedCategory = category?.value
            setFieldValue("category", transformedCategory)
        },
        [setFieldValue]
    )

    const transformedCategory = useMemo(() => {
        return values.category === 0 ?
            { label: "Text", value: 0 } :
            { label: "Video", value: 1 }
    }, [values])

    // How to get "Text" from FileCategory.Text ??
    // FileCategory[FileCategory.Text]
    // Think how to rewrite it later

    const onAllowedGroupsIdsChange = useCallback(
        (allowedGroups: MultiValue<{ value: number, label: string }>) => {
            const mappedGroups = allowedGroups.map(({ value }) => value)
            setFieldValue("allowedGroupsIds", mappedGroups)
        },
        [setFieldValue]
    )

    const mappedAllowedGroups = useMemo(() => {
        return values.allowedGroupsIds.map((value) => {
            return {
                label: `Group ${value}`,
                value
            }
        })
    },
        [values]
    )

    const onFileIdChange = useCallback(
        (fileId: SingleValue<{ value: number, label: string }>) => {
            const transformedFileId = fileId?.value
            setFieldValue("fileId", transformedFileId)
        },
        [setFieldValue]
    )

    const transformedFileId = useMemo(() => {
        return {
            label: `Filename ${values.fileId}`,
            value: values.fileId
        }
    },
        [values])

    return (
        <form onSubmit={handleSubmit}>
            <VStack p={2} gap={4}>
                <FormControl isRequired>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        value={values["name"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name={"name"}
                        id="name"
                        type="text"
                        placeholder="File card name"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Input
                        value={values["description"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="description"
                        id="description"
                        type="text"
                        placeholder="File card description"
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel
                        htmlFor="category">Category</FormLabel>
                    <Select
                        options={[
                            {
                                label: "Text",
                                value: FileCategory.Text
                            },
                            {
                                label: "Video",
                                value: FileCategory.Video
                            }
                        ]}
                        id="category"
                        name="category"
                        value={transformedCategory}
                        onChange={onCategoryChange}
                        onBlur={handleBlur}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="allowedGroupsIds">Allowed Groups</FormLabel>
                    <Select
                        isMulti
                        id="allowedGroupsIds"
                        name="allowedGroupsIds"
                        options={[1, 2, 3].map(id => {
                            return {
                                label: `Group ${id}`,
                                value: id
                            }
                        })}
                        value={mappedAllowedGroups}
                        onChange={onAllowedGroupsIdsChange}
                        onBlur={handleBlur}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel
                        htmlFor="fileId">File</FormLabel>
                    <Select
                        options={[1, 2, 3].map(id => {
                            return {
                                label: `Filename ${id}`,
                                value: id
                            }
                        })}
                        id="fileId"
                        name="fileId"
                        value={transformedFileId}
                        onChange={onFileIdChange}
                        onBlur={handleBlur}
                    />
                </FormControl>
                <Button w="full" type="submit">
                    {buttonText}
                </Button>
            </VStack>
        </form>
    )
}

export default FileCardUpsertForm