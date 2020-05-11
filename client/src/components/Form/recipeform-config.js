export const FormStructure = [
    {
        name: 'title'
    },
    {
        name: 'subtitle'
    },
    {
        name: 'prepTime',
        label: 'Preparation Time (mins)',
        integer: 'true'
    },
    {
        name: 'cookTime',
        label: 'Cooking Time (mins)',
        integer: 'true'
    },
    {
        name: 'serves',
        integer: 'true'
    },
    {
        name: 'ingredients',
        multiline: true,
        rows: 6
    },
    {
        name: 'method',
        multiline: true
    },
    {
        name: 'extras',
        multiline: true
    },
    {
        name: 'creator',
        label: 'Created By'
    }
];
