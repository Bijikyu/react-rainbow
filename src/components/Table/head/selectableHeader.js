import React from 'react';
import PropTypes from 'prop-types';
import RenderIf from '../../RenderIf';
import PrimitiveCheckbox from '../../PrimitiveCheckbox';
import StyledWrapper from './styled/wrapper';
import StyledCheckboxWrapper from './styled/checkboxWrapper';
import StyledScrollShadow from './styled/scrollShadow';

const bulkStateMap = { all: true, some: 'indeterminate', none: false };
export default function SelectableHeader(props) {
    const {
        onSelectAllRows,
        onDeselectAllRows,
        tableId,
        maxRowSelection,
        bulkSelection,
        hasScroll,
        isListView,
        style,
    } = props;
    const name = `${tableId}-options`;
    const isDisabled = maxRowSelection === 0;
    const isRadio = maxRowSelection === 1;
    const checked = bulkStateMap[bulkSelection];

    const handleClick = event => {
        if (bulkSelection === 'none') {
            return onSelectAllRows(event);
        }
        return onDeselectAllRows(event);
    };

    if (isRadio) {
        return (
            <StyledWrapper as="th" style={style} scope="col" tabIndex={-1}>
                <RenderIf isTrue={!isListView}>
                    <StyledScrollShadow hasScroll={hasScroll} />
                </RenderIf>
            </StyledWrapper>
        );
    }

    return (
        <StyledWrapper as="th" style={style} scope="col" tabIndex={-1}>
            <StyledCheckboxWrapper style={style}>
                <PrimitiveCheckbox
                    name={name}
                    label="select all rows"
                    hideLabel
                    type="checkbox"
                    tabIndex="-1"
                    checked={checked}
                    disabled={isDisabled}
                    onClick={handleClick}
                />
            </StyledCheckboxWrapper>
            <RenderIf isTrue={!isListView}>
                <StyledScrollShadow hasScroll={hasScroll} />
            </RenderIf>
        </StyledWrapper>
    );
}

SelectableHeader.propTypes = {
    onSelectAllRows: PropTypes.func,
    onDeselectAllRows: PropTypes.func,
    tableId: PropTypes.string.isRequired,
    maxRowSelection: PropTypes.number,
    bulkSelection: PropTypes.oneOf(['none', 'some', 'all']),
    hasScroll: PropTypes.bool,
    isListView: PropTypes.bool,
    style: PropTypes.object,
};

SelectableHeader.defaultProps = {
    onSelectAllRows: () => {},
    onDeselectAllRows: () => {},
    maxRowSelection: undefined,
    bulkSelection: 'none',
    hasScroll: false,
    isListView: false,
    style: undefined,
};
