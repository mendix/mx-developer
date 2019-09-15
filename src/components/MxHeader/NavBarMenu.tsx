import React from 'react';

import { NodeInJsonFile } from '../../typings';

/**
 * handle errors when `nodes` is invalid here,
 * so this component is robust by itself,
 * not depending on its parent's implementation
 */

const NavBarMenu = ({
    nodes,
    isOnMobile,
}: {
    nodes: NodeInJsonFile[] | null | undefined;
    isOnMobile: boolean;
}) =>
    nodes && nodes.length > 0 ? (
        <ul
            className={
                isOnMobile
                    ? 'MxHeader__nav-bar-menu'
                    : 'MxHeader__nav-bar-menu--desktop'
            }
        >
            {nodes.map(node => (
                <li key={node.key} className="MxHeader__nav-bar-menu-item">
                    <a
                        className="MxHeader__nav-bar-menu-item-link"
                        href={node.link}
                        target={node.external ? '_blank' : '_self'}
                    >
                        {node.label}
                    </a>
                </li>
            ))}
        </ul>
    ) : null;

export default NavBarMenu;
