import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoriesData } from '../SupportCategories';

const SupportTopic = () => {
  const { catId, topicSlug } = useParams();
  const cat = categoriesData.find(c => c.id === catId);
  const topic = cat ? cat.items.find(it => encodeURIComponent(String(it).toLowerCase().replace(/[^a-z0-9]+/g,'-')) === topicSlug) : null;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-3">{topic || 'Topic not found'}</h2>
          <p className="text-muted">This is a placeholder page for the support topic. Replace with real content as needed.</p>
          <Link to="/support" className="text-primary">Back to support</Link>
        </div>
      </div>
    </div>
  );
}

export default SupportTopic;
