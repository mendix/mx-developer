import React from 'react';

interface MobileMenuProps {
    toggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isOn: boolean;
}

const MobileMenuToggle = ({ toggle, isOn }: MobileMenuProps) => (
    <button
        onClick={toggle}
        className="MxHeader__mobile-menu-toggle"
        type="button"
    >
        <span
            className={
                isOn
                    ? 'MxHeader__mobile-menu-toggle-box--on'
                    : 'MxHeader__mobile-menu-toggle-box'
            }
        >
            <span
                className={
                    isOn
                        ? 'MxHeader__mobile-menu-toggle-middle-bar--on'
                        : 'MxHeader__mobile-menu-toggle-middle-bar'
                }
            />
        </span>
    </button>
);

export default MobileMenuToggle;
