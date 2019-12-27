import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import moment from 'moment';

import { getFormattedDate, getCurrentMonth } from '../utils';

import styles from './Header.styles';

const getColumns = (numberOfDays, selectedDate) => {
  const columns = [];
  const start = -moment().isoWeekday() + 1
  const end = start + numberOfDays
  for (let i = start; i < end; i += 1) {
    let date = moment(selectedDate);
    date = date.add(i, 'd');
    columns.push(date.toDate());
  }
  return columns;
};

const getFontSizeHeader = (numberOfDays) => {
  if (numberOfDays > 1) {
    return 12;
  }

  return 16;
};

const getDayTextStyles = (numberOfDays) => {
  const fontSize = numberOfDays === 7 ? 12 : 14;
  return {
    fontSize,
  };
};

const Column = ({
  column, numberOfDays, format, labelStyle,
}) => {
  return (
    <View style={styles.column}>
      <Text style={[styles.text, getDayTextStyles(numberOfDays), labelStyle]}>
        {getFormattedDate(column, format)}
      </Text>
    </View>
  );
};

const Columns = ({ columns, numberOfDays, format, labelStyle, renderColumn, }) => {
  return (
    <View style={styles.columns}>
      {columns.map((column) => {
        if (renderColumn){
          return renderColumn({ column, numberOfDays, format, labelStyle, })
        }
        return (
          <Column
            key={column}
            column={column}
            numberOfDays={numberOfDays}
            format={format}
            labelStyle={labelStyle}
          />
        );
      })}
    </View>
  );
};

const Title = ({ numberOfDays, selectedDate, headerTitle, }) => { // eslint-disable-line react/prop-types
  return (
    <View style={styles.title}>
      <Text
        style={[styles.text, { fontSize: getFontSizeHeader(numberOfDays) }]}
      >
        {headerTitle || getCurrentMonth(selectedDate)}
      </Text>
    </View>
  );
};

const WeekViewHeader = ({
  numberOfDays, selectedDate, formatDate, headerTitle, style, labelStyle, renderColumn,
}) => {
  const columns = getColumns(numberOfDays, selectedDate);
  return (
    <View style={[styles.container, style]}>
      <Title numberOfDays={numberOfDays} selectedDate={selectedDate} headerTitle={headerTitle} labelStyle={labelStyle} />
      {columns && <Columns format={formatDate} columns={columns} numberOfDays={numberOfDays} labelStyle={labelStyle} renderColumn={renderColumn} />}
    </View>
  );
};

WeekViewHeader.propTypes = {
  numberOfDays: PropTypes.oneOf([1, 3, 7]).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  formatDate: PropTypes.string,
  headerTitle: PropTypes.string,
  style: PropTypes.object,
  labelStyle: PropTypes.object,
  renderColumn: PropTypes.func,
};

WeekViewHeader.defaultProps = {
  formatDate: 'MMM D',
};

export default WeekViewHeader;
