import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Alignment extends Plugin {
    static get pluginName() {
        return 'Alignment';
    }

    init() {
        const editor = this.editor;

        editor.model.schema.extend('$text', { allowAttributes: 'alignment' });

        editor.conversion.attributeToAttribute({
            model: {
                key: 'alignment',
                values: [ 'left', 'center', 'right' ]
            },
            view: 'style'
        });

        editor.commands.add('alignment', {
            exec: (editor, alignment) => {
                editor.model.change(writer => {
                    const selectedElement = editor.model.document.selection.getSelectedElement();

                    if (selectedElement) {
                        writer.setAttribute('alignment', alignment, selectedElement);
                    }
                });
            },
            refresh: (editor, selection) => {
                const selectedElement = selection.getSelectedElement();
                const allowedAlignments = ['left', 'center', 'right'];

                if (selectedElement && selectedElement.is('text')) {
                    return allowedAlignments.includes(selectedElement.getAttribute('alignment'));
                }

                return allowedAlignments.includes(selectedElement && selectedElement.getAttribute('alignment'));
            },
            value: (editor) => {
                const selectedElement = editor.model.document.selection.getSelectedElement();

                if (selectedElement && selectedElement.is('text')) {
                    return selectedElement.getAttribute('alignment');
                }

                return selectedElement && selectedElement.getAttribute('alignment');
            }
        });

        editor.ui.componentFactory.add('alignment', locale => {
            const command = editor.commands.get('alignment');
            const buttonView = editor.ui.view.button({
                label: 'Alignment',
                icon: 'align-left',
                tooltip: true
            });

            for (const alignment of ['left', 'center', 'right']) {
                editor.ui.view.toolbar.items.get('textFormatting').items.add(command.createButton(alignment));
            }
        });
    }
}
