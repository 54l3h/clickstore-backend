import { FilterQuery, Model, PopulateOptions, ProjectionType } from 'mongoose';

interface IFoundOneOptions<TDocument> {
  filters: FilterQuery<TDocument>;
  select?: ProjectionType<TDocument>;
  populateArray?: PopulateOptions[];
  sort?: string | {};
}

interface IFoundManyOptions<TDocument> {
  filters?: FilterQuery<TDocument>;
  select?: ProjectionType<TDocument>;
  populateArray?: PopulateOptions[];
}

export abstract class BaseRepository<TDocument> {
  constructor(private readonly model: Model<TDocument>) {}

  async create(document: Partial<TDocument>): Promise<TDocument> {
    return await this.model.create(document);
  }

  async findOne({
    filters,
    select = '',
    populateArray = [],
    sort = {},
  }: IFoundOneOptions<TDocument>): Promise<TDocument | null> {
    return await this.model
      .findOne(filters, select)
      .populate(populateArray)
      .sort(sort);
  }

  async find({
    filters = {},
    select = '',
    populateArray = [],
  }: IFoundManyOptions<TDocument>): Promise<TDocument[] | null> {
    return await this.model.find(filters, select).populate(populateArray);
  }

  async save(document: TDocument) {
    return this.save(document);
  }
}
