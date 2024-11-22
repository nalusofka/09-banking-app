import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Modal from "../../../../src/app/ui/components/Modal";

describe("Componente Modal", () => {
    const mockOnClose = vi.fn();
    const mockOnConfirm = vi.fn();

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("no se renderiza cuando `isOpen` es `false`", () => {
        const { container } = render(
            <Modal isOpen={false} onClose={mockOnClose} title="Título del Modal">
                Contenido del Modal
            </Modal>
        );

        expect(container.firstChild).toBeNull();
    });

    it("se renderiza correctamente cuando `isOpen` es `true`", () => {
        const { getByText, asFragment } = render(
            <Modal isOpen={true} onClose={mockOnClose} title="Título del Modal">
                Contenido del Modal
            </Modal>
        );

        expect(getByText("Título del Modal")).toBeInTheDocument();
        expect(getByText("Contenido del Modal")).toBeInTheDocument();

        expect(asFragment()).toMatchSnapshot();
    });

    it("ejecuta `onClose` al hacer clic en el botón Cancelar", () => {
        const { getByText } = render(
            <Modal isOpen={true} onClose={mockOnClose} title="Título del Modal">
                Contenido del Modal
            </Modal>
        );

        const cancelButton = getByText("Cancelar");
        fireEvent.click(cancelButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("renderiza y ejecuta `onConfirm` si se proporciona", () => {
        const { getByText } = render(
            <Modal
                isOpen={true}
                onClose={mockOnClose}
                onConfirm={mockOnConfirm}
                title="Título del Modal"
            >
                Contenido del Modal
            </Modal>
        );

        const confirmButton = getByText("Confirmar");
        fireEvent.click(confirmButton);

        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it("no renderiza el botón Confirmar si `onConfirm` no se proporciona", () => {
        const { queryByText } = render(
            <Modal isOpen={true} onClose={mockOnClose} title="Título del Modal">
                Contenido del Modal
            </Modal>
        );

        const confirmButton = queryByText("Confirmar");
        expect(confirmButton).not.toBeInTheDocument();
    });
});
